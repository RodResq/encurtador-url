package br.com.encurtadorurl.rest;

import br.com.encurtadorurl.domain.Url;
import br.com.encurtadorurl.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/encurtador-rest/api")
@CrossOrigin(origins = "*")
public class EncurtadorRest {

    public static final String HTTPS_PREFIX = "https://";

    @Autowired
    private UrlService urlService;

    @GetMapping("/test")
    @ResponseBody
    public String encurtador() {
        System.out.println("Entrou no encurtador");
        return "www.abc.com";
    }

    @PostMapping
    public ResponseEntity<Url> salvar(@RequestBody Url url) {
        return new ResponseEntity<>(urlService.salvarUrl(url), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public void redirectById(@PathVariable Long id, HttpServletResponse httpServletResponse) {
        Url idUrl = urlService.buscarPorId(id);
        httpServletResponse.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        httpServletResponse.setHeader("Location", HTTPS_PREFIX.concat(idUrl.getUrlOriginal()));
        httpServletResponse.setHeader("Connection", "close");
    }


    @GetMapping("/codigo/{urlOriginal}")
    public ResponseEntity<List<Url>> encurtarMesmaUrl(@PathVariable String urlOriginal) {
        List<Url> urlList = urlService.buscarUrlOriginal(urlOriginal);
        return new ResponseEntity<>(urlList, HttpStatus.FOUND);
    }
}