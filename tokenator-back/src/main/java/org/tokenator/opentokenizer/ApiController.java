package org.tokenator.opentokenizer;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.tokenator.opentokenizer.domain.entity.PrimaryData;
import org.tokenator.opentokenizer.domain.entity.SurrogateData;
import org.tokenator.opentokenizer.domain.repository.PrimaryDataRepository;
import org.tokenator.opentokenizer.domain.repository.SurrogateDataRepository;
import org.tokenator.opentokenizer.util.LuhnUtil;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.transaction.Transactional;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static org.tokenator.opentokenizer.util.DateSerializer.DATE_FORMAT;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ApiController {

    private PrimaryDataRepository primaryDataRepo;
    private SurrogateDataRepository surrogateDataRepo;

    @Autowired
    public ApiController(
            PrimaryDataRepository primaryDataRepo,
            SurrogateDataRepository surrogateDataRepo
    ) {
        this.primaryDataRepo = primaryDataRepo;
        this.surrogateDataRepo = surrogateDataRepo;
    }


   /*
    *  Create a primary data entry.  Example:
    *
    *   $ curl -X POST -H 'Content-Type: application/json' -d '{"pan": "4046460664629L", "expr": "2201"}' http://localhost:4343/api/primaries/
    */
    @RequestMapping(
            value = "/primaries",
            method = RequestMethod.POST
    )
    @ResponseStatus(HttpStatus.CREATED)
    public SurrogateData createPrimary(@RequestBody PrimaryData primaryData,
    		@RequestParam(value = "i", defaultValue = "10") int i) {
    	String sensitive = primaryData.getPan();
    	String token = SecurityUtility.randomPassword(i);
    	Date expr = primaryData.getExpr();
    	
        System.out.println(sensitive);
        System.out.println(token);
        SurrogateData surrogateData = new SurrogateData();
        surrogateData.setSan(token + sensitive.substring(sensitive.length() - 4));
        surrogateData.setExpr(expr);
        
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

        // Get the date today using Calendar object.
        Date time = Calendar.getInstance().getTime();        
        // Using DateFormat format method we can create a string 
        // representation of a date with the defined format.
        String insertTime = df.format(time);
        // Print what date is today!
        surrogateData.setTime(insertTime);
        
    	if(primaryDataRepo.findByPanAndExpr(primaryData.getPan(), expr )!= null){
    		PrimaryData primaryDataOld = primaryDataRepo.findByPanAndExpr(primaryData.getPan(), expr );
    		primaryDataOld.addSurrogate(surrogateData);
    		surrogateData.setPrimaryData(primaryDataOld);
    		surrogateDataRepo.save(surrogateData);
    		return surrogateData;
//	    	return primaryDataOld;
    		
    	}
        

	     primaryData.setPan(sensitive);
	     surrogateData.setPrimaryData(primaryData);
	     primaryData.addSurrogate(surrogateData);
	     primaryDataRepo.save(primaryData);
//	     return primaryDataRepo.save(primaryData);
	     return surrogateData;
	   }


   /*
    *  Lookup primary PAN data by id. Example retrieving primary data for id=1:
    *
    *   $ curl -X GET http://localhost:8080/api/v1/primaries/1
    */
    @RequestMapping(
            value = "/primaries/{id}",
            method = RequestMethod.GET
    )
    @ResponseStatus(HttpStatus.CREATED)
    public PrimaryData findPrimaryById(@PathVariable(value="id") Long id) {
        PrimaryData primary = primaryDataRepo.findOne(id);
        if (primary == null) {
            throw new EntityNotFoundException(PrimaryData.class, id);
        }
        return primary;
    }
    
    
    
	@RequestMapping(
            value = "/primaries/findAll",
            method = RequestMethod.POST
    )
	@ResponseStatus(HttpStatus.CREATED)
    public List<PrimaryData> findPrimaryAll(@RequestParam(value = "param[]") String[] paramValues) throws ParseException {
    	List<PrimaryData> list = new ArrayList<>();
    	System.out.println(paramValues);
    	for(String  data : paramValues ){
    		System.out.println(data);
    		int index = data.indexOf('/');
    		System.out.println(index);
    		String token = data.substring(0, index);
    		String expr = data.substring(index + 1);
    		DateFormat format = new SimpleDateFormat("yyMM", Locale.ENGLISH);
    		Date date= format.parse(expr);
    		PrimaryData primary = primaryDataRepo.findBySurrogate(token, date);
	        if(primary != null){
	         	 list.add(primary);
	        }
	        else{
	        	list.add(null);
	        }
    	}

        return list;
    }
	
	
	@RequestMapping(
            value = "/primaries/submitAll",
            method = RequestMethod.POST
    )
    @ResponseBody
    public List<SurrogateData> submitPrimaryAll(@RequestParam(value = "param[]") String[] paramValues) throws ParseException {
		List<SurrogateData> list = new ArrayList<>();

    	System.out.println(paramValues);
    	for(String  data : paramValues ){
    		System.out.println(data);
    		int index = data.indexOf('/');
    		System.out.println(index);
    		String token = data.substring(0, index);
    		data = data.substring(index + 1);
    		index = data.indexOf('/');
    		String expr = data.substring(0, index);
    		int n = Integer.valueOf(data.substring(index + 1));
    		DateFormat format = new SimpleDateFormat("yyMM", Locale.ENGLISH);
    		Date exprDate= format.parse(expr);
    		
    		PrimaryData primary = new PrimaryData();
    		primary.setExpr(exprDate);
    		primary.setPan(token);
    		list.add(createPrimary(primary, n));
	        
    	}
    	return list;
	}
	
//	 try {
//
//        File f = new File("src/main/resources/data.txt");
//
//        BufferedReader b = new BufferedReader(new FileReader(f));
//
//        String readLine = "";
//
//        System.out.println("Reading file using Buffered Reader");
//
//        while ((readLine = b.readLine()) != null) {
//            int index = readLine.indexOf('/');
//            String token = readLine.substring(0, index);
//            String expr = readLine.substring(index + 1);
//            DateFormat format = new SimpleDateFormat("yyMM", Locale.ENGLISH);
//            Date date= format.parse(expr);  
//            
//            System.out.println(token);
//            System.out.println(date);
//            //token 
//            PrimaryData primary = primaryDataRepo.findBySurrogate(token, date);
//            if(primary != null){
//           	 	list.add(primary);
//             }
//        }
//
//    } catch (IOException e) {
//        e.printStackTrace();
//    } catch (ParseException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	}
	

    /*
     *  Lookup primary data by pan and yyMM expiration date.  Example:
     *
     *   $ curl -X GET http://localhost:4343/api/v1/primaries/4046460664629718/1801
     */
    @RequestMapping(
            value = "/primaries/{pan}/{expr}",
            method = RequestMethod.GET
    )
    @ResponseStatus(HttpStatus.OK)
    public PrimaryData findPrimaryByPanAndExpr(
            @PathVariable(value="pan") String pan,
            @PathVariable(value="expr")
            @DateTimeFormat(pattern = DATE_FORMAT) Date expr) {

        PrimaryData primary = primaryDataRepo.findByPanAndExpr(pan, expr);
        if (primary == null) {
            throw new EntityNotFoundException(PrimaryData.class, pan, expr);
        }
        return primary;
    }

    /*
     *  Delete primary entry by id.  Surrogates are deleted by cascade. Example:
     *
     *   $ curl -X DELETE http://localhost:4343/api/primaries/1
     */
    @RequestMapping(
            value = "/primaries/{id}",
            method = RequestMethod.DELETE
    )
    @ResponseStatus(HttpStatus.NO_CONTENT) /* 204, success but no response payload */
    public void deletePrimaryById(@PathVariable(value="id") long primaryId) {
        primaryDataRepo.delete(primaryId);
    }



    /*
     *  Create a surrogate for a primary data entry with the specified id.  Example:
     *
     * $ curl -X POST -H 'Content-Type: application/json' -d '{"pan": "98765432109876", "expr": "1801"}' \
     *     http://localhost:8080/api/v1/primaries/1/surrogates/
     */
    @RequestMapping(
            value = "/primaries/{primaryId}/surrogates/",
            method = RequestMethod.POST
    )
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public SurrogateData createSurrogate(
            @PathVariable(value="primaryId") Long primaryId,
            @RequestBody SurrogateData surrogateData) {

        PrimaryData primary = primaryDataRepo.findOne(primaryId);
        if (primary == null) {
            throw new EntityNotFoundException(PrimaryData.class, primaryId);
        }

        surrogateData.setSan(LuhnUtil.validateAcctNumAndAdjustLuhn(surrogateData.getSan()));
        primary.addSurrogate(surrogateData);

        return surrogateData;
    }


    /*
     *  Find the primary data that owns the requested surrogate pan+expr. Example:
     *
     *   $ curl -X GET http://localhost:4343/api/v1/primaries/surrogates/98765432109876/1801
     */
    @CrossOrigin()
    @RequestMapping(
            value = "/primaries/surrogates/{san}/{expr}",
            method = RequestMethod.GET
    )
    @ResponseStatus(HttpStatus.OK)
    public PrimaryData findPrimaryOfSurrogate(
            @PathVariable(value="san") String san,
            @PathVariable(value="expr")
            @DateTimeFormat(pattern = DATE_FORMAT) Date expr) {
    	System.out.println(expr);
        PrimaryData primary = primaryDataRepo.findBySurrogate(san, expr);
        if (primary == null) {
            throw new EntityNotFoundException(SurrogateData.class, san, expr);
        }
        return primary;
    }


   /*
    *  Delete surrogate entry by id. Example
    *
    *   $ curl -X DELETE http://localhost:8080/api/v1/surrogates/1
    */
    @RequestMapping(
            value = "/surrogates/{surrogateId}",
            method = RequestMethod.DELETE
    )
    @ResponseStatus(HttpStatus.NO_CONTENT) /* 204, success but no response payload */
    @Transactional
    public void deleteSurrogate(@PathVariable(value="surrogateId") long surrogateId) {
        surrogateDataRepo.delete(surrogateId);
    }


    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseStatus(value=HttpStatus.NOT_FOUND,reason="Entity not found")
    public void notFound() {
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(value=HttpStatus.CONFLICT,reason="Entity already exists")
    public void duplicateEntryExists() {
    }

}
