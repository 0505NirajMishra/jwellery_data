import Image from 'next/image';
import { useModalState } from '@/components/ui/modal/modal.context';
import { useIsRTL } from '@/utils/locals';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
} from '@/components/ui/slider';
import useSwiperRef from '@/utils/use-swiper-ref';

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const RefundImageModal = () => {
  const { data } = useModalState();
  const { isRTL } = useIsRTL();

  const [nextEl, nextRef] = useSwiperRef<HTMLDivElement>();
  const [prevEl, prevRef] = useSwiperRef<HTMLDivElement>();

  return (
    <div className="m-auto block w-full max-w-[680px] rounded bg-light p-3">
      <div className="relative">
        <Swiper
          id="refund-gallery"
          modules={[Navigation]}
          initialSlide={data?.initSlide}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.navigation.init();
            }, 100);
          }}
          loop={data?.images?.length > 1}
          navigation={{
            prevEl,
            nextEl,
          }}
          {...swiperParams}
        >
          {data?.images?.map((item: any) => (
            <SwiperSlide
              key={`refund-gallery-${item.id}`}
              className="relative flex items-center justify-center selection:bg-transparent"
            >
              <Image
                // src={item?.original ?? '/product-placeholder-borderless.svg'}
                src={''}
                alt={`Refund gallery ${item.id}`}
                width={800}
                height={800}
                className="object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {data?.images?.length > 1 && (
          <>
            <div
              ref={prevRef}
              className="refund-gallery-prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 start-2 hover:bg-gray-100 md:-mt-5 md:h-9 md:w-9 md:start-3"
            >
              {isRTL ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </div>
            <div
              ref={nextRef}
              className="refund-gallery-next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 end-2 hover:bg-gray-100 md:-mt-5 md:h-9 md:w-9 md:end-3"
            >
              {isRTL ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RefundImageModal;
