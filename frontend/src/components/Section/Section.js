import React from 'react'
import classes from './section.module.css'

export default function Section() {
  return (
    <div className={classes.hero_section}>
      <p className={classes.hero_text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
        recusandae.
      </p>
      <h1 className={classes.hero_heading}>Ecommerce</h1>
    </div>
  )
}
