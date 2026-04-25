import styles from './InfoTable.module.css';

export function InfoTable() {
  return (
    <div id="about" className={`grid-system ${styles.table}`}>
      <div className={`grid-item ${styles.label}`}>What This Page Should Tell You</div>
      <div className={`grid-item ${styles.content}`}>
        <p>
          Steven's public work clusters around <b>Dify plugins</b>, agent
          skills, Chinese LLM experiments, personal search interfaces, and
          small apps that solve real workflow problems. The through-line is
          simple: <i>make AI useful, inspectable, and easy to reach</i>.
        </p>
        <a className="pill-tag pill-tag--md" href="mailto:i@stv.pm">
          Contact i@stv.pm ➞
        </a>
      </div>
    </div>
  );
}
