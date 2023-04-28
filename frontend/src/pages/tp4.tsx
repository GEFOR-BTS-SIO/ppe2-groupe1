import Link from 'next/link'
import React, { useState } from 'react';
import { Pokemon } from '../../components/pokemon';

  function PokemonPage(){
  return (
    <div>
      <Link href="/">Home</Link> <br />
      <Link href="/qui">QUI</Link>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      
      
      <Pokemon id="25"/>
      <Pokemon id="888"/>
      <Pokemon id="17"/>
      <Pokemon id="500"/>
      <Pokemon id="367"/>
      <Pokemon id="720"/>
      <Pokemon id="126"/>
      <Pokemon id="280"/>
      <Pokemon id="790"/>
      <Pokemon id="250"/>
      <Pokemon id="540"/>
      <Pokemon id="210"/>
      <Pokemon id="67"/>
      
      </div>
      </div>
      );
  } 
    
export default PokemonPage;