import './styles/hero.scss';
import './styles/globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getEventsWithHostData } from '../database/events';
import { getAllAttendingUserProfilePictures } from '../database/participations';
import { getUserBySessionToken } from '../database/users';
import Map from './map/map';

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const participations = await getAllAttendingUserProfilePictures();

  const events = await getEventsWithHostData();

  return (
    <main className="hero-background">
      <div className="hero-container">
        <div className="hero-image-container">
          <Image
            priority
            src="/wine-scenery.gif"
            alt="Artistic Background Image"
            className="hero-image"
            width={4297}
            height={2865}
            quality={100}
          />
        </div>
        <div className="hero-text-container">
          <h2 className="hero-text-header">
            Win<div className="hero-text-header2">zer</div>
          </h2>
          <h2 className="hero-text-slogan">
            Find your next wine tasting event
          </h2>
          <div className="hero-text-button-container">
            <div className="hero-text">
              From intimate tastings to grand wine festivals, our platform
              connects like-minded enthusiasts and knowledgeable experts to
              explore the best wines from around the world. Join us today and
              uncork your passion for wine with Winzer!
            </div>
            <div className="hero-button-container">
              <Link className="get-started-button" href="/register">
                <div className="button-text">Get Started</div>
                <div className="fill-container" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="map-bg">
        <Map user={user} participations={participations} events={events} />
      </div>
      <div className="under-map-bg">
        <img
          src="/Karte.jpg"
          alt="drawing of a wine map"
          className="under-map-image"
        />
      </div>
      <h2 className="info-header">Your Wine Journey Starts here</h2>
      <div className="info-slogan">grow your Passion and Returns</div>

      <div className="info-container">
        <div className="info-box-container-single">
          <div className="info-box-image-container">
            <img
              className="info-box-image"
              alt="visibility"
              src="/walk-to-your-wine.jpg"
            />
          </div>
          <div className="info-box-text-container">
            <h3 className="info-box-header">Walk to your Adventure</h3>
            <div className="info-box-text">
              What could be nicer than exploring the different wine-growing
              regions on foot? Numerous hiking trails lead through the
              picturesque wine landscape and thus provide a special insight and
              outlook on the subject of wine.
            </div>
          </div>
        </div>

        <div className="info-box-container">
          <div className="info-box-image-container">
            <div className="info-box-double-image-container">
              <img
                className="info-box-image-double-one"
                alt="wine cellar"
                src="/wine-cellar.jpg"
              />
              <img
                className="info-box-image-double-two"
                alt="wine cellar"
                src="/wine-cellar2.jpg"
              />
            </div>
            <div className="info-box-text-container">
              <h3 className="info-box-header">Experience Wine at it's roots</h3>
              <div className="info-box-text">
                Winzer facilitates networking between attendees and
                exhibitors.This will help to create a more engaging and
                interactive experience for attendees, as well as provide
                opportunities for hosts to connect with potential customers and
                partners.
              </div>
            </div>
          </div>
        </div>
        <div className="info-box-container">
          <div className="info-box-container-single">
            <div className="info-box-image-container">
              <img
                className="info-box-image"
                alt="Access"
                src="/phone-out.jpg"
              />
            </div>
            <div className="info-box-text-container">
              <h3 className="info-box-header">
                Easy Access to Events near you
              </h3>
              <div className="info-box-text">
                Winzer provides you with easy access to all the information you
                need about your next event, including dates, times, location,
                and host details.
              </div>
            </div>
          </div>
        </div>

        <div className="info-box-container">
          <div className="info-box-image-container">
            <div className="info-box-double-image-container">
              <img
                className="info-box-image-double-one"
                alt="a wine farmer with barrels"
                src="/winzer-with-barrels.jpg"
              />
              <img
                className="info-box-image-double-two"
                alt="two people enjoying wine"
                src="/two-people-with-wine.jpg"
              />
            </div>
            <div className="info-box-text-container">
              <h3 className="info-box-header">Find hidden Gems</h3>
              <div className="info-box-text">
                Winzer allows you to find hidden gems in your area. You can find
                events that are not advertised on other platforms and get to
                know the local wine scene from a different perspective. This is
                a great way to discover new wine experiences and wineries that
                you might not known existed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
