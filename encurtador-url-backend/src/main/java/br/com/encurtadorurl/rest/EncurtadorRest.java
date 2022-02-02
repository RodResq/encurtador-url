package br.com.encurtadorurl.rest;

import br.com.encurtadorurl.domain.Url;
import br.com.encurtadorurl.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/encurtador-rest/api")
@CrossOrigin(origins = "*")
public class EncurtadorRest {

    public static final String HTTPS_PREFIX = "https://";

    @Autowired
    private UrlService urlService;


    @PostMapping
    public ResponseEntity<Url> salvar(@RequestBody Url url) {
        return new ResponseEntity<>(urlService.salvarUrl(url), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public void redirectById(@PathVariable Long id, HttpServletResponse httpServletResponse) {
        Url idUrl = urlService.buscarPorId(id);
        httpServletResponse.setStatus(HttpServletResponse.SC_FOUND);
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "");
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
        httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
        httpServletResponse.setHeader("Access-Control-Expose-Headers", "Location");
        httpServletResponse.setHeader("Location", HTTPS_PREFIX.concat(idUrl.getUrlOriginal()));
        httpServletResponse.setHeader("Connection", "Close");
    }


    @GetMapping("/codigo/{urlOriginal}")
    public ResponseEntity<Url> encurtarMesmaUrl(@PathVariable String urlOriginal) {
        Url url = urlService.buscarUrlOriginal(urlOriginal);
        if(Objects.isNull(url)) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(url, HttpStatus.OK);
    }
}
