package org.tokenator.opentokenizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDateTime;
import java.util.TimeZone;

@ComponentScan
@EnableAutoConfiguration
//@EntityScan("org.tokenator.opentokenizer.domain.entity")
//@EnableJpaRepositories("org.tokenator.opentokenizer.domain.repository")
public class Application {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        LocalDateTime l = LocalDateTime.now();
        System.out.println(l);
        SpringApplication.run(Application.class, args);
       
    }
}









