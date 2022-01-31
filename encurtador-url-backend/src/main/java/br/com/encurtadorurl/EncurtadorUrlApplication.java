package br.com.encurtadorurl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class EncurtadorUrlApplication {

	public static void main(String[] args) {

//		SpringApplication.run(EncurtadorUrlApplication.class, args);
//		Seta profile(loca, dev, prod)
		new SpringApplicationBuilder(EncurtadorUrlApplication.class)
				.profiles("local")
				.run(args);
	}


}
