import splashImg from '../assets/data/splashImg.png';
import logo from '../assets/data/logo.svg';
import { SplashScreenSVG } from '../assets/data/svgs';

const SplashScreen: React.FC = () => {
    return (
        <div className="splash">
            <SplashScreenSVG svgClass={"splash-img"} pathClass={'char glow'} />
        </div>
    )
}

export default SplashScreen;