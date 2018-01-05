package org.tokenator.opentokenizer.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.tokenator.opentokenizer.domain.entity.SurrogateData;

public interface SurrogateDataRepository extends CrudRepository<SurrogateData, Long> {

}
