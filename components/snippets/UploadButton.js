import Link from 'next/link';
import IconUpload from './icons/IconUpload';

const UploadButton = () => (
    <Link href="/addapicture">
        <a className="menu-upload">
            <IconUpload />
            <span className="menu-upload__label">upload</span>
        </a>
    </Link>
);
export default UploadButton;