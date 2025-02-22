import styles from './DominationMenu.module.css';

interface DominationMenuProps {
  dominationLevels: { [region: string]: number };
}

const DominationMenu = ({ dominationLevels = {} }: DominationMenuProps) => {
  const totalDomination = Object.values(dominationLevels).reduce((acc, level) => acc + level, 0) / (Object.keys(dominationLevels).length || 1);

  return (
    <div className={styles.governanceFrame}>
      <div className={styles.menuFrameBackground} />
      <div className={styles.governanceInner}>
        <table className={styles.governanceTable}>
          <tbody>
            <tr>
              <td>日本の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{totalDomination.toFixed(0)}%</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: '0px 0' }}>
                <div className={styles.menuLine}></div>
              </td>
            </tr>
            <tr>
              <td>関西の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Kansai || 0}%</td>
            </tr>
            <tr>
              <td>中部の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Chubu || 0}%</td>
            </tr>
            <tr>
              <td>関東の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Kanto || 0}%</td>
            </tr>
            <tr>
              <td>東北の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Tohoku || 0}%</td>
            </tr>
            <tr>
              <td>中国の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Chugoku || 0}%</td>
            </tr>
            <tr>
              <td>四国の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Shikoku || 0}%</td>
            </tr>
            <tr>
              <td>九州の統治度</td>
              <td style={{ textAlign: 'right', paddingLeft: '20px' }}>{dominationLevels.Kyushu || 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DominationMenu;