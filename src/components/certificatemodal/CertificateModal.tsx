'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Certificate } from '../../json/certificates';
import styles from './CertificateModal.module.css';
import { FaCheck } from 'react-icons/fa';
import imageLoader from '../../../image-loader';

interface Props {
    certificate: Certificate;
}

export default function CertificateView({ certificate }: Props) {
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    return (
        <section className={styles.certificateView}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.content}
                >
                    <div className={styles.header}>
                        <h1>{certificate.title}</h1>
                        <div className={styles.badge}>
                            <FaCheck /> Official Partner
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <motion.div
                            className={styles.imageSection}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setIsImageZoomed(true)}
                        >
                            <Image
                                loader={imageLoader}
                                src={certificate.certificateImage}
                                alt={certificate.alt}
                                width={800}
                                height={600}
                                className={styles.certificateImage}
                                priority
                            />
                            <div className={styles.imageOverlay}>
                                <span>Click to zoom</span>
                            </div>
                        </motion.div>

                        <div className={styles.details}>
                            {/* <div className={styles.info}>
                                <div className={styles.infoItem}>
                                    <FaCalendarAlt />
                                    <div>
                                        <span>Issue Date</span>
                                        <strong>{certificate.certificationDate}</strong>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <FaClock />
                                    <div>
                                        <span>Valid Until</span>
                                        <strong>{certificate.validityDate}</strong>
                                    </div>
                                </div>
                            </div> */}

                            <div className={styles.features}>
                                <h2>Partnership Benefits</h2>
                                <ul>
                                    {certificate.features.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {isImageZoomed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.modal}
                    onClick={() => setIsImageZoomed(false)}
                >
                    <Image
                        loader={imageLoader}
                        src={certificate.certificateImage}
                        alt={certificate.alt}
                        width={1200}
                        height={900}
                        className={styles.zoomedImage}
                    />
                </motion.div>
            )}
        </section>
    );
}