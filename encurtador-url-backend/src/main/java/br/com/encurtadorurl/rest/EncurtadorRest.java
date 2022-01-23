package br.com.encurtadorurl.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/encurtador-rest/api")
@CrossOrigin(origins = "*")
public class EncurtadorRest {

    @GetMapping("/test")
    @ResponseBody
    public String encurtador() {
        System.out.println("Entrou no encurtador");
        return "www.abc.com";
    }
}
