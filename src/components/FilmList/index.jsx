"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FilmList.module.css";
export default function FilmList() {

const url = "https://ghibliapi.vercel.app/films"; //link API externa
const [films, setFilms] = useState([]); //useState para armazenar os filmes
const [loading, SetLoading] = useState(true); //useState para armazenar o loading
const [error, setError] = useState(null); //useState para armazenar o erro
useEffect(() => {
 const feachFilms = async () => {
  try {
    SetLoading(true)
    const response = await axios.get(url); //requisição para a API
    setFilms(response.data); //armazenando os filmes no state
    SetLoading(false)
  } catch (error) {
    console.log("Erro ao buscar filmes na API");
    setError("Não foi possível carregar os filmes. Tente novamente mais tarde."); //armazenando o erro no state
    SetLoading(false)
  } 
 }
 feachFilms(); //chamando a função para buscar os filmes
}, [])
  
if (loading) {
  return (
    <div className= {styles.loading}>
     Carregando filmes...
    </div>
  )
}

if (error) {
  return (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  );
}


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filmes do Studio Ghibli</h1>
      <div className={styles.filmGrid}>
        {films.map((film) => (
          <div key={film.id} className={styles.filmCard}>
            <div className={styles.imageContainer}>
              <img src={film.image} alt={film.title} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.filmTitle}>{film.title}</h2>
              <p className={styles.director}>Diretor: {film.director}</p>
              <p className={styles.year}>{film.release_date}</p>
              <div className={styles.rating}>
                <span className={styles.score}>{film.rt_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}