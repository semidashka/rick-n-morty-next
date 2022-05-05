import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const CharacterDetails = styled.main`
  margin: 1rem;
`;

const CharacterDetailsText = styled.div`
  padding: 1.5rem;
`;

const CharacterDetailsFrame = styled.div`
  max-width: 80rem;
  background-color: black;
  color: var(--ricky-and-morty-text-color);
  margin: 1rem auto;
  border-radius: 5px;
  box-shadow: var(--boxshadow-grey);
`;

export default function Home() {
  const { query } = useRouter();
  const { characterId } = query;
  const [characterInfo, setCharacterInfo] = useState({
    loaded: false,
  });

  useEffect(() => {
    if (characterId) {
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterInfo({
            ...data,
            loaded: true,
          });
        });
    }
  }, [characterId]);

  if (characterInfo.loaded) {
    return (
      <CharacterDetails>
        <CharacterDetailsFrame>
          <img
            src={characterInfo.image}
            alt={`Picture of ${characterInfo.name}`}
          />
          <CharacterDetailsText>
            <h2>{characterInfo.name}</h2>
            <h3>First appeared in episode 0</h3>
            <h3>Gender: {characterInfo.gender}</h3>
            <h3>Species: {characterInfo.species}</h3>
            <h4>Origin: {characterInfo.origin.name}</h4>
            <p>{characterInfo.type}</p>
            <p>Last seen in {characterInfo.location.name}</p>
          </CharacterDetailsText>
        </CharacterDetailsFrame>
      </CharacterDetails>
    );
  } else {
    return <h1>Loading data...</h1>;
  }
}

export function fetchCharaterDetails(id = 10) {
  fetch(`https://rickandmortyapi.com/api/character/${query.characterId}`)
    .then((response) => response.json())
    .then((data) => {
      charDetailsSection.innerHTML = '';
      const episodeNum = data.episode[0].split('/').pop();

      // const charDetailsElem = document.createElement('div');
      // charDetailsElem.className = 'character__details--frame';
      // charDetailsElem.innerHTML = `
      // <img
      //       src="${data.image}"
      //       alt="picture of ${data.name}"
      //     />
      //     <div class="character__details-text">
      //       <h2>${data.name}</h2>
      //       <h3>First appeared in episode ${episodeNum}</h3>
      //       <h3>Gender: ${data.gender}</h3>
      //       <h3>Species: ${data.species}</h3>
      //       <h4>Origin: ${data.origin.name}</h4>
      //       <p>${data.type}</p>
      //       <p>Last seen in ${data.location.name}</p>
      //       `;
      // charDetailsSection.append(charDetailsElem);
    });
}
