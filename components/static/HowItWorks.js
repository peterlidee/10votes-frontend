import IconPlaceHolder from '../snippets/IconplaceHolder';
import IconRules from '../snippets/IconRules';

const picArray = [
    0,1,0,0,2,
    1,0,0,1,0,
    0,0,2,0,0,
    0,2,0,0,0,
    0,0,0,1,0,
]

const HowItWorks = props => (
    <div className="staticpage">
        <section className="howitworks">
            
            <div className="howitworks__block">
                <h1 className="howitworks__title">How do you find the most beautiful locations in any given town or place?</h1>
            </div>

            <div className="howitworks__block">
                <p>Imagine if everybody has the opportunity to share 10 locations they love and cast 10 votes on locations other people shared.</p>
            </div>
            
            <div className="howitworks__block howitworks__block--animation">
                <div className="pic-animation clearfix">
                    {picArray.map((pic, i) => {
                        const tap = pic > 0 ? "icon__placeholder--tap" : "";
                        return(
                            <div key={i} className={`pic pic--${i}`}>
                                <IconPlaceHolder tap={tap} />
                                {pic > 0 && <span className="pic__number">{pic}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="howitworks__block">
                <h2 className="howitworks__subtitle">the game</h2>
                <p>You get 10 and only 10 votes and pictures. Use, delete and reuse them as you see fit. Share exotic locations, ancient building or a quiet little forest paths in your area. Browse other people's pictures and cast votes on the ones you like. Discover locations or explore new corners.</p>
            </div>

            <div className="howitworks__block howitworks__block--rules">
                <h2 className="howitworks__subtitle">some rules</h2>
                <div className="howitworks__rules">            
                    <div className="howitworks__rule">
                        <IconRules shape="thief" />
                        <div className="howitworks__rule-text">use your own pictures</div>
                    </div>
                    <div className="howitworks__rule">
                        <IconRules shape="duck" />
                        <div className="howitworks__rule-text">no selfies</div>
                    </div>
                    <div className="howitworks__rule">
                        <IconRules shape="noText" />
                        <div className="howitworks__rule-text">no text</div>
                    </div>
                </div>
            </div>

        </section>
    </div>
)

export default HowItWorks;
