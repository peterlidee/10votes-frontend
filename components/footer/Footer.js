import Link from 'next/link';

const Footer = () => (
    <footer className="site__footer">
        <div className="footer__section--logo">
            <h3 className="footer__title footer__logo">
                <span className="logo__number logo__number--footer">10</span>
                <span className="logo__label logo__label--footer">votes</span>
            </h3>
            <div className="footer__slogan">a portfolio project</div>
            <div className="footer__copy">&copy; 2021</div>
        </div>

        <div className="footer__section--about">
            <h3 className="footer__title">about</h3>
            <Link href="/"><a className="footer__link">home</a></Link>
            <Link href="/howitworks"><a className="footer__link">how it works</a></Link>
            <Link href="/about"><a className="footer__link">about</a></Link>
            <Link href="/signup"><a className="footer__link">signup</a></Link>
        </div>

        <div className="footer__section--stack">
            <h3 className="footer__title">stack</h3>
            <a href="https://www.prisma.io/" className="footer__link">Prisma</a>
            <a href="https://www.apollographql.com/" className="footer__link">Apollo GraphQL</a>
            <a href="https://nextjs.org/" className="footer__link">next.js</a>
            <Link href="/about"><a className="footer__link">&gt; about stack</a></Link>
        </div>

        <div className="footer__section--source">
            <h3 className="footer__title">source code</h3>
            <a href="https://github.com/peterlidee/10votes-backend" className="footer__link">backend (github)</a>
            <a href="https://github.com/peterlidee/10votes-frontend" className="footer__link">frontend (github)</a>
        </div>

        <div className="footer__section--contact">
            <h3 className="footer__title">contact</h3>
            <a href="mailto:peter@lidee.be" className="footer__link">peter@lidee.be</a>
            <a href="https://www.twitter.com/lideebe" className="footer__link">twitter @lideebe</a>
        </div>

    </footer>
);

export default Footer;