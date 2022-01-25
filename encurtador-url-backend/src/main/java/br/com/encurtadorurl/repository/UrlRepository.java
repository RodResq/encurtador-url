package br.com.encurtadorurl.repository;

import br.com.encurtadorurl.domain.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    @Query(value = "SELECT * FROM url u WHERE u.URL_ORIGINAL LIKE :url", nativeQuery = true)
    List<Url> findByOriginal(@Param("url") String urlOriginal);
}
