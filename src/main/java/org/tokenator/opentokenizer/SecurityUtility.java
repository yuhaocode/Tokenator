package org.tokenator.opentokenizer;

import java.util.Random;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtility {
	
	@Bean
	@Scope("prototype")
	public static String randomPassword(int n) {

		String tokenChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder token = new StringBuilder();
		Random rnd = new Random();
		//input digits    OneToMany   Transaction time    variable name   100 iNput fpe
		while(token.length() < n) {
			int index = (int) (rnd.nextFloat() * tokenChars.length());
			token.append(tokenChars.charAt(index));
		}
		
		String tokenStr = token.toString();
		return tokenStr;
	}
}