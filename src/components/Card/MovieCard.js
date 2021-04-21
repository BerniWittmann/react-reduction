import React, { useEffect, useState, useCallback, Fragment } from 'react';
import PropTypes from 'utils/propTypes';

import Typography from 'components/Typography';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

const MovieCard = ({ movieID, ...restProps }) => {
    const [movieData, setMovieData] = useState(null);

    const fetchMovieData = useCallback(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
        fetch(url).then((res) => res.json()).then((data) => {
            // update state with API data
            setMovieData({
                movieID: data.id,
                originalTitle: data.original_title,
                tagline: data.tagline,
                overview: data.overview,
                homepage: data.homepage,
                poster: data.poster_path,
                production: data.production_companies,
                productionCountries: data.production_countries,
                genre: data.genres,
                release: data.release_date,
                vote: data.vote_average,
                runtime: data.runtime,
                revenue: data.revenue,
                backdrop: data.backdrop_path
            });
          })
    }, [movieID])

    fetchMovieData();

    useEffect(() => {
        console.warn(movieData);
    }, [movieData]);

  return (
    <Card inverse className="text-center">
        <CardImg width="100%" src={'https://image.tmdb.org/t/p/original' + movieData.backdrop} />
        <CardImgOverlay className="cr-movie-card__overlay">
            <CardBody style={{ height: '100%' }}>
            <Card className="flex-row cr-movie-card__content">
                <CardImg
                className="card-img-left cr-movie-card__content__poster"
                src={'https://image.tmdb.org/t/p/' + 'w500' + movieData.poster}
                style={{ width: 'auto', height: '100%', backgroundColor: '#000000', marginBottom: 10 }}
                />
                <CardBody>
                    <CardTitle className="cr-movie-card__content__title"><Typography type="h1">{ movieData.originalTitle }</Typography></CardTitle>
                    { movieData.tagline ?
                      (<CardText  className="cr-movie-card__content__tagline"><Typography type="text-primary">{ movieData.tagline }</Typography></CardText>)
                      : null
                    }
                    <CardText  className="cr-movie-card__content__description"><Typography type="">{ movieData.overview }</Typography></CardText>
                </CardBody>
            </Card>
            </CardBody>
        </CardImgOverlay>
    </Card>
  );
};

export default MovieCard;
