import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Certification from './Certification';
 
export default class extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={70}
        totalSlides={2}
      >
        <Slider>
          <Slide index={0}><Certification text="Dosage 1" dose={this.props.dose1}/></Slide>
          <Slide index={1}><Certification text="Dosage 2" dose={this.props.dose2}/></Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    );
  }
}