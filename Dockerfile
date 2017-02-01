FROM java:7
MAINTAINER Alpha Hinex <AlphaHinex@gmail.com>

RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
RUN wget https://download.jetbrains.com/charisma/youtrack-7.0.29566.jar -O youtrack.jar

EXPOSE 80
CMD ["java", "-Xmx1g", "-XX:MaxPermSize=250m", "-Djava.awt.headless=true", "-jar", "youtrack.jar", "80/youtrack"]
