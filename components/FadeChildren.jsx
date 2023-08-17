import React from 'react';

const FadeChildren = ({ children, once, delay }) => {
  // data-aos="fade-up" data-aos-duration="1000" data-aos-delay={}
  // return all children with fade up animation and increasing delay
  return React.Children.map(children, (child, i) => {
    if (child === null) return null;
    return React.cloneElement(child, {
      'data-aos': 'fade-up',
      'data-aos-duration': '600',
      'data-aos-once': once ? once : 'false',
      'data-aos-delay': delay ? delay * 100 + 100 : i * 100 + 100,
    });
  });
};

export default FadeChildren;
