import styles from './Contacts.module.scss';

function Contacts() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Contacts</h1>
      <h2 className={styles.subtitle}>or how to find us (better don`t)</h2>
      <p className={styles.text}>Adress: no official address yet, but you can search on map</p>
      <iframe
        title="This is a unique title"
        // eslint-disable-next-line max-len
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2196.74305988177!2d-14.962400094820556!3d64.24112362147731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48cfab45b8d6aa4f%3A0xb6d56447d9bb3511!2sHofn%20AFS!5e1!3m2!1sen!2sru!4v1676235166048!5m2!1sen!2sru"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className={styles.phone}>phone: +1 234 567-89-01</p>
      <p className={styles.smalltext}>*phone number is also fictional</p>
    </div>
  );
}

export default Contacts;
