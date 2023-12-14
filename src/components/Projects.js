import { loremIpsum } from "react-lorem-ipsum";
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/fade";
import ProjectBox from "./ProjectBox";
import { useState } from "react";

const Projects = () => {
    const [active,setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    }

    return (
        <motion.div
            variants={fadeIn('left','spring',0.5,0.75,'easeOut')}
            initial="hidden"
            animate={active ? 'visible' : 'hidden'}
            handleClick={setActive}
            onClick={handleClick}
        >
        <div className="flex space-x-4">
            <ProjectBox 
                imageUrl = "https://img.game8.co/3242471/c834a093c0f91ccf92e8561f91b6adba.jpeg/show"
                title="Title"
                description={loremIpsum.call()}
                linkTo="hello"
            
            />
            <ProjectBox 
                imageUrl = "https://img.game8.co/3242471/c834a093c0f91ccf92e8561f91b6adba.jpeg/show"
                title="Title"
                description={loremIpsum.call()}
                linkTo="hello"
            
            />
        </div>
        </motion.div>

    )
};

export default Projects;