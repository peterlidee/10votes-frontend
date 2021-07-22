import MetaTitle from "../snippets/MetaTitle";

const About = () => (
    <>
            <h1 className="title title--large">About</h1>
        <div className="flat-text">

            <MetaTitle>About</MetaTitle>
            <p>Dit is een <strong>portfolio project</strong>. Het is een weergave van mijn kennis van React en GraphQL.</p>

            <h3>Webapp</h3>

            <p><span className="tenvotes"><span className="ten">10</span> <span className="votes">votes</span></span> is een photo app. Je browset door foto's via locaties of tags. Door te registreren en in te loggen kan je zelf foto's uploaden of updaten, locaties of tags toevoegen en op foto's van anderen stemmen.</p>
            <p>Daarnaast is er ook nog een backend deel waar administrators gebruikers, locaties, tags en foto's kunnen aanmaken, aanpassen of verwijderen.</p>

            <h3>Doel</h3>

            <p>Het idee om 10 votes te maken kwam tijdens het volgen van de cursus <a href="https://advancedreact.com/">Fullstack Advanced React &amp; GraphQL</a> van Wes Bos. (Ondertussen heeft dze cursus een update gekregen maar ik werkte op basis van de eerste versie.) In deze cursus leer je een kleine webshop bouwen.</p>

            <p>Met 10 votes wou ik mijn kennis verbeteren en vergroten. Ik gebruikte dezelfde stack maar bouwde er iets nieuw mee.</p>

            <h3>Nieuw</h3>

            <p>Het oorspronkelijk project uit de cursus draaide rond producten, users en een winkelkarretje. Ik voegde nieuwe elementen toe:</p>

            <ul>
                <li>Locatie en tags taxonomie.</li>
                <li>Sorteeropties.</li>
                <li>Mogelijkheid om te stemmen.</li>
                <li>Admin gedeelte om inhoud en gebruikers te beheren.</li>
            </ul>

            <h3>Backend <a href="https://github.com/peterlidee/10votes-backend" className="flat-text__title-link">code op github</a></h3>

            <p>De backend stack bestaat uit GraphQL, <a href="https://www.prisma.io/">Prisma</a> en <a href="https://www.apollographql.com/docs/apollo-server/v2">Apollo</a>. Ik voerde een major update door van Apollo Server 1 naar 2 met bijhorende configuratie. Het datamodel, schema en de resolvers zijn volledig nieuw. Het login gedeelte nam ik grotendeels over.</p>

            <p>De backend server wordt gehost op <a href="https://www.heroku.com/">Heroku</a>. De database en Prisma schema's staan op <a href="https://www.prisma.io/">Prisma</a> en de afbeeldingen worden op <a href="https://cloudinary.com/">Cloudinary</a> gehost.</p>

            <h3>Frontend <a href="https://github.com/peterlidee/10votes-frontend" className="flat-text__title-link">code op github</a></h3>

            <p>De frontend bestaat uit <a href="https://www.apollographql.com/docs/react/">Apollo Client (react)</a> + <a href="https://nextjs.org/">Next.js</a> en wordt op <a href="https://www.heroku.com/">Heroku</a> gehost. Ik maakte de overschakeling van graphql-yoga (apollo client 2) naar <a href="https://www.npmjs.com/package/@apollo/client">@apollo/client 3</a> (major update) en <a href="https://www.npmjs.com/package/apollo-server-express">apollo-server-express</a>.</p>
            <p>Nieuwe elementen zijn:</p>
            <ul>
                <li>Dynamic routes voor taxonomie.</li>
                <li>Url query parameters voor sorteren.</li>
                <li>Apollo hooks.</li>
                <li>React hooks en context.</li>
                <li>100% nieuwe interface.</li>
            </ul>

            <h3>Work in progress</h3>

            <p>Dit project is niet af. Er zitten fouten in, problemen, dingen die beter kunnen of ontbreken. Maar het is een functionerende fullstack webapp.</p> 

        </div>
    </>
);

export default About;