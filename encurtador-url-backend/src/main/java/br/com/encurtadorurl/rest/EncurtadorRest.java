package br.com.encurtadorurl.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/encurtador-rest/api")
public class EncurtadorRest {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public String encurtador() {
        System.out.println("Entrou no encurtador");
        return "www.abc.com";
    }
}
