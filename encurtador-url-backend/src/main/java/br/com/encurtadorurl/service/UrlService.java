package br.com.encurtadorurl.service;

import br.com.encurtadorurl.domain.Url;
import br.com.encurtadorurl.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    public Url salvarUrl(Url url) {
        try {
            url.setDataHoraCriacao(LocalDate.now());
            if(url.getUrlOriginal() != null) {
                url.setNovaUrl(getUrlReduzida());
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return urlRepository.save(url);
    }

    private String getUrlReduzida() {
        String CHARS = "abcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder urlReduzida = new StringBuilder();
        Random random = new Random();
        while (urlReduzida.length() < 5) {
            int index = (int) random.nextFloat() * CHARS.length();
            urlReduzida.append(CHARS.charAt(index));
        }
        String urlReduzidaStr = urlReduzida.toString();
        return urlReduzidaStr;
    }
}
