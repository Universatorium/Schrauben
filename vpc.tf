#----------------------------------------------------------------------------
# VPC mit jeweils 2 öffentlichen und privaten Subnetzen, 
# einem Internet-Gateway und einer Routing-Tabelle
#----------------------------------------------------------------------------

resource "aws_vpc" "default_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "example-vpc"
  }
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.default_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-central-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet-1"
  }
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.default_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-central-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet-2"
  }
}

resource "aws_subnet" "private_subnet_1" {
  vpc_id      = aws_vpc.default_vpc.id
  cidr_block  = "10.0.3.0/24"
  availability_zone = "eu-central-1a"
  tags = {
    Name = "private-subnet-1"
  }
}

resource "aws_subnet" "private_subnet_2" {
  vpc_id      = aws_vpc.default_vpc.id
  cidr_block  = "10.0.4.0/24"
  availability_zone = "eu-central-1b"
  tags = {
    Name = "private-subnet-2"
  }
}

resource "aws_internet_gateway" "standard_igw" {
  vpc_id = aws_vpc.default_vpc.id
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.default_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.standard_igw.id
  }
}

resource "aws_route_table_association" "public_subnet_1_association" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_2_association" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}
