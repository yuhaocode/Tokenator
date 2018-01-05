package org.tokenator.opentokenizer.domain.repository;


import java.util.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.tokenator.opentokenizer.domain.entity.PrimaryData;

public interface PrimaryDataRepository extends CrudRepository<PrimaryData, Long> {
    @Query( "SELECT pd " +
            "FROM  PrimaryData pd " +
            "JOIN  pd.surrogates sd " +
            "WHERE sd.san  = :san " +
            "AND   sd.expr = :expr"
        )
    PrimaryData findBySurrogate(
            @Param("san") String san,
            @Param("expr") Date expr
    );
    
    PrimaryData findByPanAndExpr(String pan, Date expr);
}
