import { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const MotionChakraImage = ({ src, alt, ...props }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      // transition={{ duration: 0.3 }}
      initial='hidden'
      animate={imageIsLoaded ? 'visible' : 'hidden'}
      variants={variants}
    >
      <Image
        src={src}
        alt={alt}
        fallbackSrc={null}
        placeholder={null}
        objectPosition='center'
        objectFit='contain'
        onLoad={(e) => setImageIsLoaded(true)}
        {...props}
      />
    </motion.div>
  );
};
