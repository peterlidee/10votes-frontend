import Link from 'next/link';
import IconUpload from '../header/IconUpload';

const UploadButton = () => (
    <Link href="/addapicture">
        <a className="upload">
            <IconUpload />
            <span className="upload__label">upload</span>
        </a>
    </Link>
);
export default UploadButton;