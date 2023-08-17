import React from 'react';
import Styles from '../styles/button.module.scss';
import MiniLabel from './MiniLabel';
import Link from 'next/link';
import FadeChildren from './FadeChildren';

const Button = (props) => {
  if (props.path) {
    return (
      <Link
        className={
          Styles.button + ' ' + (props.isPrimary ? Styles.primary : '') + ' ' + (props.className ? props.className : '')
        }
        href={props.path}
        data-aos={props['data-aos'] ? props['data-aos'] : null}
        data-aos-duration={props['data-aos-duration'] ? props['data-aos-duration'] : null}
        data-aos-delay={props['data-aos-delay'] ? props['data-aos-delay'] : null}
        data-aos-once={props['data-aos-once'] ? props['data-aos-once'] : null}>
        {props.label}
        {props.isNew && <MiniLabel label="New" />}
      </Link>
    );
  }

  return (
    <button
      type={props.type ? props.type : 'button'}
      name={props.name}
      value={props.value}
      className={
        Styles.button + ' ' + (props.isPrimary ? Styles.primary : '') + ' ' + (props.className ? props.className : '')
      }
      disabled={props.disabled}
      onClick={props.onClick}
      data-aos={props['data-aos'] ? props['data-aos'] : null}
      data-aos-duration={props['data-aos-duration'] ? props['data-aos-duration'] : null}
      data-aos-delay={props['data-aos-delay'] ? props['data-aos-delay'] : null}
      data-aos-once={props['data-aos-once'] ? props['data-aos-once'] : null}>
      {props.icon && <div className={Styles.btnIcon}>{props.icon}</div>}
      <div className={Styles.btnLabel}>
        {props.label ? props.label : null}
        {props.isNew && <MiniLabel label="New" />}
      </div>
    </button>
  );
};

export default Button;
