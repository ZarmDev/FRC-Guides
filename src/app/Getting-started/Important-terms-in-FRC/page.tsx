export default function main() {
return (
<div className="ml-10">
<h1>Definitions</h1>
<p>Game field: Where the robot competes - it's different every year</p>
<p>Game piece: Usually a ball or some object that can be used to score points depending on the year</p>
<p>Teleoperated: When the "driver" or person controls the robot</p>
<p>Autonomous: When the robot drives itself and usually uses pre-created "paths" (search PathPlanner or Choreo) or/and camera's to estimate it;s position and help it get to certain places on the field</p>
<h1>Mechanisms</h1>
<p>Manipulator: A part that interacts with game pieces.</p>
<p>Drivetrain:</p>
<p>Intake: A part of the robot that holds a game piece</p>
<p>Swerve drive: </p>
<p>Mecancum drive:</p>
<p>Hang: The parts that allow the robot to hang on to something (depending on the year's rules/theme)</p>
<h1>Programming</h1>
<h2>Terms</h2>
<p>April tags: QR codes on the field that can be used with a camera to estimate the robot's position</p>
<h2>Libraries</h2>
<p>Photonvision: Used to detect april tags and sometimes more. IT helps you estimate the robot's position on the field during auton</p>
<h1>Tools</h1>
<p>AdvantageScope: Lets you simulate wrist arms, swerve drive, etc</p>
<h1>More resources</h1>
<p>https://www.chiefdelphi.com/t/the-unofficial-frc-mechanism-encyclopedia/398617</p>
</div>
)
}