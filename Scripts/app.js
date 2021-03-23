const tl = gsap.timeline({default: {ease: 'power1.out'}});

tl.to('.text', {y:'0%', duration: 1, stagger: 0.5});
tl.to('.hide',{opacity: 0, duration: 1})
tl.to('.wrapper',{backgroundColor:'rgba(0, 0, 0, 0.7)', duration: 1})
tl.to('.progress',{opacity: 1, duration: 1})