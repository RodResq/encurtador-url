package br.com.encurtadorurl;

import br.com.encurtadorurl.rest.EncurtadorRest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class EncurtadorUrlApplication {

	public static void main(String[] args) {
		SpringApplication.run(EncurtadorUrlApplication.class, args);
	}

}
