import React, { useState } from 'react';
import styles from './HelpPanel.module.css';

const HelpPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={styles.helpButton} onClick={openModal}>
        遊び方
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h1>遊び方</h1>
            <div className={styles.detailContainer}>
                <div className={styles.detail}>
                  <div className={styles.detailContents}>
                    <div className={styles.imageContainer}>
                      <div className={styles.detailIndex}>①</div>
                      <div className={styles.detail1Image}/>
                    </div>
                    <div className={styles.detailText}>
                        <p>まずはパーツを十字キーを使って"パーツ生成ゾーン"から
                            "プレイゾーン"に持っていきましょう。</p>
                        <p>プレイゾーンでのみパーツの"回転"及び"設置"が出来ます。</p>
                        <p>移動・・・十字キー</p>
                        <p>回転・・・スペースキー</p>
                        <p>設置・・・エンターキー</p>
                    </div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.detailContents}>
                    <div className={styles.imageContainer}>
                      <div className={styles.detailIndex}>②</div>
                      <div className={styles.detail2Image}></div>
                    </div>
                    <div className={styles.detailText}>
                        <p>次にパーツを設置していきましょう。</p>
                        <p>各パーツには"接続ドック（黄色のブロック）が２つあり、接続ドック同士を隣接して
                        置かなければなりません。</p>
                        <p>また、二つのパーツを設置すると特別な接続ドックが出現します。（水色のブロック）</p>
                    </div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.detailContents}>
                    <div className={styles.imageContainer}>
                      <div className={styles.detailIndex}>③</div>
                      <div className={styles.detail3Image}></div>
                    </div>
                    <div className={styles.detailText}>
                        <p>この特別な接続ドックに他の接続ドックを隣接して設置することで古墳が完成です。</p>
                    </div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.detailContents}>
                    <div className={styles.imageContainer}>
                      <div className={styles.detailIndex}>④</div>
                      <div className={styles.detail4Image}></div>
                    </div>
                    <div className={styles.detailText}>
                        <p>古墳が完成しないともらえるスコアは減少してしまいます。（このスコアは統治度に影響します。）</p>
                        <p>たくさんのパーツを設置してスコアを稼ぐか、少ないパーツでも古墳を完成させることを優先するかはプレイヤー次第です。</p>
                        <p>では古墳づくりを楽しんでください！</p>
                    </div>
                  </div>
                </div>
                <button className={styles.closeButton} onClick={closeModal}>
                閉じる
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPanel;