import styles from './ImageList.module.css'

// HOOKS
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// COMPONENTS
import ModalConfirmExcludeImage from '../../../ModalConfirmExcludeImage/ModalConfirmExcludeImage'

const ImageList = ({ setFile, images, allImages }) => {

    const [openModalConfirmExcludeImage, setOpenModalConfirmExcludeImage] = useState(false)
    const [ searchParams, setSearchParams] = useSearchParams()

    const id = images.id

    const api_url = import.meta.env.VITE_API_URL

    const regex = new RegExp(/\.(png|jpg)$/)

    const result = regex.test(images.filename)

    const handleDelete = () => {
        if (result) {
            setSearchParams({"id": id})
            setOpenModalConfirmExcludeImage(state => !state)
        } else {
            const newList = allImages.filter(files => files.id != id)
            setFile(newList)
        }
    }

    const handleSetInput = (novoValor) => {
        const novaLista = allImages.map(objeto =>
            objeto.id === id ? { ...objeto, legenda: novoValor } : objeto
        );

        setFile(novaLista);
    }

    const renderinImages = result ? `${api_url}/estacoes/${images.filename}` : images.preview

    return (
        <>
            <li className={styles.container}>

                <img
                    src={renderinImages}
                    alt={images.legenda}
                    className={styles.image_container}
                />

                <div className={styles.container_input}>
                    <label>
                        <span>Digite uma legenda para a imagem</span>
                        <input
                            type="text"
                            placeholder='Digite uma Legenda para a Imagem'
                            maxLength={100}
                            onChange={(e) => handleSetInput(e.target.value)}
                            value={images.legenda}
                            disabled={result}
                        />
                    </label>

                    <abbr title="Excluir Imagem ">
                        <button
                            type='button'
                            onClick={handleDelete}
                        >
                            <span className={styles.excluir_imagem}>X</span>
                        </button>
                    </abbr>
                </div>

            </li>
            {openModalConfirmExcludeImage && (
                <ModalConfirmExcludeImage
                    setOpenModal={setOpenModalConfirmExcludeImage}
                    setFile={setFile}
                    allImages={allImages}
                />
            )}
        </>
    )
}

export default ImageList
