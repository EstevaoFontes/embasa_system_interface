import styles from './ElevatoriaImages.module.css'

import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ElevatoriaImages = ({ images = [] }) => {

    const api_url = import.meta.env.VITE_API_URL

    const [previewImage, setPreviewImage] = useState(0)

    if (images.length === 0) {
        return (
            <div className={styles.no_image}>
                <i className='bi bi-image'></i>
                <span>Nenhuma Imagem adicionada</span>
                <span>Adicione Images ao clicar no botão <strong className={styles.strong}>Editar</strong></span>
            </div>
        )
    }

    return (
        <div className={styles.container_image}>
            <div className={styles.image}>
                <LazyLoadImage
                    src={`${api_url}/estacoes/${images[previewImage].filename}`}
                    alt={images[previewImage].legenda}
                    placeholderSrc={`${api_url}/estacoes/${images[previewImage].filename}`}
                    effect='blur'
                    className={styles.image_lazy}
                />

                {images.length - 1 != previewImage && (
                    <button
                        className={styles.button_next_image}
                        onClick={() => setPreviewImage(state => state + 1)}
                    >
                        <i className='bi bi-chevron-right'></i>
                    </button>
                )}

                {previewImage > 0 && (
                    <button
                        className={styles.button_back_image}
                        onClick={() => setPreviewImage(state => state - 1)}
                    >
                        <i className='bi bi-chevron-left'></i>
                    </button>
                )}

            </div>
        </div>

    )
}

export default ElevatoriaImages
