import React from 'react';

// libs
import $ from 'jquery'
import mojs from 'mo-js'
import animate from 'animate.css'

import './css/StickyNav.css'


const shape = new mojs.Shape({
  shape:        'circle',
  scale:         { 0 : 1 },
  duration:      1000,
  delay:         1000,
  easing:        'cubic.out',
  y: -150
});


const shiftCurve = mojs.easing.path( 'M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0' );
const scaleCurveBase = mojs.easing.path( 'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100' );
const scaleCurve = (p) => { return 1 + scaleCurveBase(p); };
const nScaleCurve = (p) => { return 1 - scaleCurveBase(p)/10; };

const circle = new mojs.Shape({
  shape:        'rect',
  fill:         { '#F64040' : '#F64040', curve: scaleCurve },
  radius:       5,
  rx:           3,
  x:            { [-125] : 125, easing: shiftCurve },
  scaleX:       { 1 : 1, curve: scaleCurve },
  scaleY:       { 1 : 1, curve: nScaleCurve },
  origin:       { '0 50%' : '100% 50%', easing: shiftCurve },
  
  isYoyo:         true,
  delay:        500,
  duration:     800,
  y:            -140, 
  repeat:       1
})

const circle2 = new mojs.Shape({
  shape:        'rect',
  fill:         { '#F64040' : '#F64040', curve: scaleCurve },
  radius:       5,
  rx:           3,
  x:            { [125] : -125, easing: shiftCurve },
  scaleX:       { 1 : 1, curve: scaleCurve },
  scaleY:       { 1 : 1, curve: nScaleCurve },
  origin:       { '0 50%' : '100% 50%', easing: shiftCurve },
  
  isYoyo:         true,
  delay:        500,
  duration:     800,
  y:            -160, 
  repeat:       1
})

const rect = new mojs.Shape({
  shape:        'rect',
  left:         '50%',
  fill:         'none',
  radius:       50,
  stroke:       { 'rgba(0,255,255, 1)' : 'magenta' },
  strokeWidth:  { 10: 0 },
  strokeDasharray: '100%',
  strokeDashoffset: { '-100%' : '100%' },
  angle:        { 0: 180 },
  
  duration:     2000,
  y: 			-150
})

export default class StikyNav extends React.Component{

	componentDidMount() {
		new StickyNavigation();
		this.draw();
		setTimeout(() => {
			$("#title").addClass("animated jello")
		}, 2000)
	}

	draw = () => {
		shape.play()
		circle.play()
		circle2.play()
		rect.play()
	}

	render(){
		return(
<div>


  <section className="et-hero-tabs">
    <h1 id="title"> SPECTRAL </h1>
    <h3 id="sub">Feel the Djent</h3>
    <div className="et-hero-tabs-container">
      <a className="et-hero-tab" href="#tab-es6">Music</a>
      <a className="et-hero-tab" href="#tab-flexbox">About</a>
      <a className="et-hero-tab" href="#tab-react">Shows</a>
      <a className="et-hero-tab" href="#tab-angular">Youtube</a>
      <a className="et-hero-tab" href="#tab-other">Other</a>
      <span className="et-hero-tab-slider"></span>
    </div>
  </section>


  <main className="et-main">
    <section className="et-slide" id="tab-es6">
      <h1>ES6</h1>
      <h3>something about es6</h3>
    </section>
    <section className="et-slide" id="tab-flexbox">
      <h1>Flexbox</h1>
      <h3>something about flexbox</h3>
    </section>
    <section className="et-slide" id="tab-react">
      <h1>React</h1>
      <h3>something about react</h3>
    </section>
    <section className="et-slide" id="tab-angular">
      <h1>Angular</h1>
      <h3>something about angular</h3>
    </section>
    <section className="et-slide" id="tab-other">
      <h1>Other</h1>
      <h3>something about other</h3>
    </section>
  </main>

</div>

		)
	}
}

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function(event) { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}