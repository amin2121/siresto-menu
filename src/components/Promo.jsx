import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "../utils/axios";
import { baseUrl } from "../utils/strings";

export default function Promo() {
  const {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isFetching,
    refetch,
    isPreviousData,
  } = useQuery(["data-promo"], () => fetchData(), {
    staleTime: 15000,
    refetchInterval: 15000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const fetchData = async () => {
    const branch =
      sessionStorage.getItem("branch") != null
        ? sessionStorage.getItem("branch")
        : localStorage.getItem("branch");
    const response = await axios.get(`promo/menu?resto=${branch}`);
    const res = await response.data;
    const data = res.data;

    return data;
  };

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.map((obj, key) => (
          <div key={key}>
            <img
              src={baseUrl + obj.gambar}
              alt={obj.gambar}
              className="h-32 object-cover mt-3 px-4"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
