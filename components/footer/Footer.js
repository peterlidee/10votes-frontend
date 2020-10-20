import Link from 'next/link';

const Footer = () => (
    <footer>
        
        <div className="footer__section">
            <h3>10 votes</h3>
            <Link href="/howitworks"><a>how it works</a></Link>
            <Link href="/about"><a>about, a portfolio project</a></Link>
        </div>

        <div className="footer__section">
            <h3>stack</h3>
            <a href="https://nextjs.org/" className="footerlink">next.js</a>
            <a href="https://www.apollographql.com/" className="footerlink">Apollo GraphQL</a>
            <a href="https://www.npmjs.com/package/graphql-yoga" className="footerlink">GraphQL Yoga</a>
            <a href="https://www.prisma.io/" className="footerlink">Prisma</a>
            <Link href="/about"><a className="">more in about</a></Link>
            deployment
        </div>

        <div className="footer__section">
            <h3>source code</h3>
            <a href="https://github.com/peterlidee/10votes-backend">back end</a>
            <a href="https://github.com/peterlidee/10votes-frontend">front end</a>
        </div>

        <div className="footer__section">
            <h3>contact</h3>
            <a href="mailto:peter@lidee.be">peter@lidee.be</a>
            <a href="https://www.twitter.com/lideebe">twitter @lideebe</a>
        </div>

    </footer>
);

export default Footer;