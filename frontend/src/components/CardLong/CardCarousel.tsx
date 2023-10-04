import React, { useState,useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./CardCarousel.module.css";
import { setModal, setAlbum } from "../../store/actions";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosinstance";

interface AlbumProps {
  album: {
    musicId:number;
    title:string;
    singer:string|null;
    songImg:string|null;
    genreInfo:{
      genreId:number[];
      genreType:string;
    }[];
    viewCount:number;
  }
  like:boolean|null
}

const CardCarousel: React.FC<AlbumProps> = ({ album,like }) => {

  const dispatch = useDispatch(); // 이 위치로 변경
  const [islike, setLike] = useState<boolean|null>(null)
  const [imgErr, setImgErr] = useState<boolean>(false)
  const handleAlbumClick = () => {
    dispatch(setModal("musicDetail")); // 모달 표시 액션
    dispatch(setAlbum(album.musicId)); // 선택된 앨범 데이터 저장 액션
  };

  useEffect(()=>{
    setLike(like)
  },[like])

  const onLike = () => {
    const AccessToken = localStorage.getItem('AccessToken')
    axiosInstance({
      method: islike ? 'delete':'post',
      url:`${process.env.REACT_APP_API_URL}/music/like`,
      data:{
        musicId:album.musicId
      },
      headers:{
        Authorization:`Bearer ${AccessToken}`
      }
    }).then(res=>{
      setLike(!islike)
    }).catch(err=>{
      console.log(err)
    })
  }
 
  return (
    <div className={styles.container}>
      <div style={{width:'30%', height:'100px', margin:'0 10px',boxSizing:'border-box'}}>
        {imgErr ? <img crossOrigin="anonymous"  onClick={handleAlbumClick} src='assets/default_album.png' alt="" className={styles.image} />
        :<img crossOrigin="anonymous" onClick={handleAlbumClick} src={album?.songImg!} alt="" className={styles.image} onError={()=>setImgErr(true)} />}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.musicinfo}  onClick={handleAlbumClick}>
          <div style={{backgroundColor:'white', width:'50px', borderRadius:"20px"}}>
            <span className={styles.title} style={{color:'black'}}>{album.musicId}</span>
          </div>
          <span className={styles.title}>{album.title}</span>
          <span>{album.singer}</span>
        </div>
        <div className="iconContainer">
          {islike===null ? null :
          islike===true ? (
            <AiFillHeart
              className={styles.icon}
              onClick={() => onLike()}
            />
          ) : (
            <AiOutlineHeart
              className={styles.icon}
              onClick={() => onLike()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;