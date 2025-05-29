import { URL } from '../const';
import { Github, Linkedin } from '../icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center py-5">
      <div className="flex items-center gap-x-2">
        <a href={URL.GITHUB} target="_blank" rel="noopener noreferrer">
          <Github className="transition-transform duration-200 lg:hover:scale-110" />
        </a>
        <a href={URL.LINKEDIN} target="_blank" rel="noopener noreferrer">
          <Linkedin className="transition-transform duration-200 lg:hover:scale-110" />
        </a>
      </div>
      <p>© {currentYear}. nahyunwoo all rights reserved.</p>
    </footer>
  );
};
