
const ProjectBox = ({imageUrl,title,description,linkTo}) => {
    return (
        <div className="flex space-x-4">
            <div className=" mx-auto bg-white p-4 shadow-lg">
                <img
                    className="w-full h-40"
                    src={imageUrl}
                    alt={imageUrl}
                />
                <a href={linkTo}></a>
                <div>
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
            
        </div>
    )
};

export default ProjectBox;