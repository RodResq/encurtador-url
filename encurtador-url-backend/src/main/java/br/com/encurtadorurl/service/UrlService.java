package br.com.encurtadorurl.service;

import br.com.encurtadorurl.domain.Url;
import br.com.encurtadorurl.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Random;

@Service
public class UrlService {

    public static final String DOMINIO_PREFIX = "zg.com.br/";

    @Autowired
    private UrlRepository urlRepository;

    public Url salvarUrl(Url url) {
        try {
            Url retorno = buscarUrlOriginal(url.getUrlOriginal());
            if (Objects.nonNull(retorno)) {
                retorno.setNovaUrl(getUrlReduzida());
                return urlRepository.save(retorno);
            } else {
                url.setDataHoraCriacao(LocalDate.now());
                if(url.getUrlOriginal() != null) {
                    url.setNovaUrl(getUrlReduzida());
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return urlRepository.save(url);
    }

    public Url buscarUrlOriginal(String url) {
        return urlRepository.findByOriginal(url);
    }

    private String getUrlReduzida() {
        String CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ";
        StringBuilder urlReduzida = new StringBuilder();
        Random random = new Random();
        while (urlReduzida.length() < 5) {
            int index = (int) (random.nextFloat() * CHARS.length());
            urlReduzida.append(CHARS.charAt(index));
        }
        String urlReduzidaStr = DOMINIO_PREFIX.concat(urlReduzida.toString());
        return urlReduzidaStr;
    }

    public Url buscarPorId(Long id) {
        return urlRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }
}
