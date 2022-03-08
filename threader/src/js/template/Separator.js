import { Parallax} from "react-parallax";


const Separator = <Parallax 
renderLayer={percentage => (
    <div
        style={{
            position: 'absolute',
            background: `rgba(2233, 116, 81, ${percentage * 1})`,
            left: '0%',
            top: '0%',
            bottom: '0%',
            width: percentage*window.scrollY*2,
            height: percentage*1000,
        }}
    />
)}
>
<br /><br /><br /><br /><br /><br />
</Parallax>


export default Separator;