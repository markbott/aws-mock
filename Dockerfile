FROM frekele/gradle:3.4-jdk8u91

WORKDIR /project

ADD . /project/
CMD ["gradle", "integrationTomcatRun"]

EXPOSE 8001
