import yo from './yo.jpg';

const About = () => {
    return (
        <div className="about">
            <h1>ABOUT</h1>
            <img src={yo} alt="Yo" />
            <p>Mi nombre es Carlos Infante. Soy Cubano. Tengo un master en historia y antropologia sociocultural que no me servido de nada en Holanda asi que no me qiedo mas remedio que estudiar otra cosa. Ahora casi temino el front-end developer course</p>
            <p>Este es el proyecto de songsaver que espero que pase sin problemas... tengo la mente frita asi que la creatividad no es mucha... jajajaja</p>
            <p>No entendi ni para lo de Redux, pa empezar cuando sigo los pasos de la conferencia que recomendo Winc academy, no funciona, me dice que el valor inicial es nulo</p>

        </div>
    );
}

export default About;