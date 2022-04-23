import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SliderImgToProduct(props) {
    const { image_field, handleRemoveImage, handleSetImageField } = props;
    const [character, setCharacter] = useState(image_field);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const item = Array.from(character.image);
        const [reorderedItem] = item.splice(result.source.index, 1);
        item.splice(result.destination.index, 0, reorderedItem);
        handleSetImageField({ id: character.id, image: item });
    };

    useEffect(() => {
        image_field && setCharacter(image_field);
    }, [image_field]);

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="row"
                            style={{ width: '500px', display: 'inline-table' }}
                        >
                            {character &&
                                character.image.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className="image-files col-md-3 col-lg-3"
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: '100%' }}
                                                    src={item.data}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                                    }}
                                                />
                                                <i
                                                    className="fad fa-times-square"
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            item,
                                                            image_field.id,
                                                        )
                                                    }
                                                ></i>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

SliderImgToProduct.propTypes = {};

export default SliderImgToProduct;
