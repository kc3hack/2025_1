import styles from './DominationMenu.module.css';

const DominationMenu = () => {
  return (
    <div className={styles.governanceFrame}>
      <div className={styles.menuFrameBackground} />
      <div className={styles.governanceInner}>
        <table className={styles.governanceTable}>
          <tbody>
            <tr>
              <td>日本の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>24%</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: '0px 0' }}>
                <div className={styles.menuLine}></div>
              </td>
            </tr>
            <tr>
              <td>関西の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>50%</td>
            </tr>
            <tr>
              <td>中部の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
            <tr>
              <td>関東の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
            <tr>
              <td>東北の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
            <tr>
              <td>中国の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
            <tr>
              <td>四国の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
            <tr>
              <td>九州の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>0%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DominationMenu; 