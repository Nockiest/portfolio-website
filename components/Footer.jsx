import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodepen, faGithub, faInstagram, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <a href="mailto:ondralukes06@seznam.cz" className="footer__link">Send me a message</a>
      <ul className="social-list">
        <li className="social-list__item">
          <Link href="https://codepen.io">
            <span className="social-list__link">
              <FontAwesomeIcon icon={faCodepen} />
            </span>
          </Link>
        </li>
        <li className="social-list__item">
          <Link href="https://github.com/Nockiest">
            <span className="social-list__link">
              <FontAwesomeIcon icon={faGithub} />
            </span>
          </Link>
        </li>
        <li className="social-list__item">
          <Link href="https://www.instagram.com/ondrejovy_snidane/">
            <span className="social-list__link">
              <FontAwesomeIcon icon={faInstagram} />
            </span>
          </Link>
        </li>
        <li className="social-list__item">
          <Link href="https://www.youtube.com/channel/UCyHXnWQWCdoPa5-pMa09zoA">
            <span className="social-list__link">
              <FontAwesomeIcon icon={faYoutube} />
            </span>
          </Link>
        </li>
        <li className="social-list__item">
          <Link href="https://discord.gg/6bYUpkv6">
            <span className="social-list__link">
              <FontAwesomeIcon icon={faDiscord} />
            </span>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
